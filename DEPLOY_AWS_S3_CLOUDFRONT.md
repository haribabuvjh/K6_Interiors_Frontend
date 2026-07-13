# K6 Interiors — Static Frontend Deploy (AWS S3 + CloudFront)

Deploy the **backend-less static site** (the `out/` folder produced by `npm run build`)
to **S3 + CloudFront**. No server, no database — leads arrive by email via Web3Forms.

```
Browser ──HTTPS──▶ CloudFront (CDN + SSL) ──▶ S3 bucket (static files: out/)
                         │
Contact/booking forms ───┴──▶ Web3Forms API ──▶ your email inbox
```

**Approx. cost:** S3 (pennies) + CloudFront (free 1 TB/yr, then ~$0.085/GB) + Route 53 ($0.50/mo) + domain (~₹500–900/yr) ≈ **₹100–400/month** for low traffic. ACM SSL is free.

> Replace `k6interiors.in` with your real domain everywhere.

---

## Prerequisites
- An AWS account.
- A domain (buy `.in` cheaply from Hostinger/BigRock, or register in Route 53).
- **AWS CLI** installed and configured (`aws configure` with an IAM user's access key + secret; region `ap-south-1`).
- A free **Web3Forms** access key (below).

---

## Part 0 — Set the Web3Forms key and build

1. Go to **https://web3forms.com**, enter the inbox email that should receive leads (e.g. `admin@k6interiors.in`), and copy the **access key**.
2. In `D:\K6\K6_frontend\.env.local`, set it:
   ```ini
   NEXT_PUBLIC_WEB3FORMS_KEY=your-real-access-key
   ```
   ⚠️ This is baked into the bundle **at build time** — set it *before* building. Without it, forms show "the form isn't set up yet."
3. Build the static site:
   ```powershell
   cd D:\K6\K6_frontend
   npm ci
   npm run build      # outputs the static site to .\out
   ```
   You now have a complete static site in `D:\K6\K6_frontend\out`.

---

## Part 1 — Create the S3 bucket (static website hosting)

Website hosting is used because it natively serves `index.html` for folder URLs
like `/contact/` (our build uses `trailingSlash: true`).

```bash
# Pick a bucket name (any globally-unique name; the domain works well)
aws s3 mb s3://k6interiors-site --region ap-south-1

# Enable static website hosting (index + SPA-style 404)
aws s3 website s3://k6interiors-site --index-document index.html --error-document 404.html
```

Allow public read (the site content is public anyway). Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::k6interiors-site/*"
  }]
}
```
```bash
# Disable "block public access" for this bucket, then apply the policy
aws s3api put-public-access-block --bucket k6interiors-site \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
aws s3api put-bucket-policy --bucket k6interiors-site --policy file://bucket-policy.json
```

Upload the site:
```bash
aws s3 sync D:/K6/K6_frontend/out s3://k6interiors-site --delete
```

Your S3 **website endpoint** is now:
`http://k6interiors-site.s3-website.ap-south-1.amazonaws.com` (test it in a browser — the site should load over HTTP).

---

## Part 2 — SSL certificate (ACM — must be us-east-1!)

CloudFront only accepts certs from **N. Virginia (us-east-1)**, regardless of your bucket region.

```bash
aws acm request-certificate --region us-east-1 \
  --domain-name k6interiors.in \
  --subject-alternative-names www.k6interiors.in \
  --validation-method DNS
```
This returns a `CertificateArn`. Then:
```bash
aws acm describe-certificate --region us-east-1 --certificate-arn <CertificateArn>
```
Copy the **DNS validation CNAME** record(s) it lists and add them at your DNS provider
(or Route 53). Wait until the cert status becomes **ISSUED** (a few minutes).

---

## Part 3 — CloudFront distribution

In the **CloudFront console** (easier than CLI for the first one) → **Create distribution**:

- **Origin domain:** paste the **S3 *website* endpoint** hostname
  `k6interiors-site.s3-website.ap-south-1.amazonaws.com`
  ⚠️ Use the *website endpoint*, NOT the bucket from the dropdown — the website endpoint is what serves folder `index.html` files.
- **Protocol:** HTTP only (S3 website endpoints don't support HTTPS on the origin side; CloudFront still serves HTTPS to visitors).
- **Viewer protocol policy:** Redirect HTTP to HTTPS.
- **Default root object:** `index.html`
- **Alternate domain names (CNAMEs):** `k6interiors.in`, `www.k6interiors.in`
- **Custom SSL certificate:** select the ACM cert from Part 2.
- **Price class:** "Use only North America, Europe, Asia…" (or All) — cheapest that includes India is fine.
- Create. Wait ~5–10 min for **Deployed** status. Note the distribution domain, e.g. `dxxxx.cloudfront.net`.

Test: open `https://dxxxx.cloudfront.net` — the site should load over HTTPS with a valid cert.

---

## Part 4 — Point your domain at CloudFront

At your DNS provider (or **Route 53** if you host DNS there), create records:

| Type | Name | Value |
|------|------|-------|
| A (Alias) or CNAME | `k6interiors.in` | the CloudFront domain `dxxxx.cloudfront.net` |
| CNAME | `www` | `dxxxx.cloudfront.net` |

- On **Route 53**, use an **A record → Alias → CloudFront distribution** for the root (apex) domain.
- On other registrars that don't support apex CNAME, use their "ALIAS/ANAME" record, or forward the apex to `www`.

Wait for DNS to propagate, then open **https://k6interiors.in**. 🎉

---

## Part 5 — Verify

- `https://k6interiors.in` loads with a padlock (valid SSL).
- Every page works: `/`, `/services/`, `/portfolio/`, `/about/`, `/blog/`, `/contact/`.
- Submit the **contact form** → you receive the lead email (check spam the first time; mark "not spam").
- Submit the **service booking** on `/services/` → email arrives with the chosen service/maintenance type, date and time slot.

---

## Updating the site later

Whenever you change content/code:
```powershell
cd D:\K6\K6_frontend
git pull                 # if changes came from elsewhere
npm ci
npm run build
```
```bash
# Upload the new build
aws s3 sync D:/K6/K6_frontend/out s3://k6interiors-site --delete

# Invalidate the CDN cache so visitors get the new version immediately
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

> Tip: put those two lines in a `deploy.ps1` script so a deploy is one command.

---

## Cost recap (Mumbai + CloudFront)

| Item | Cost |
|------|------|
| S3 storage + requests (a few MB) | ~₹5–20/mo |
| CloudFront | Free 1 TB/yr, then ~$0.085/GB (low-traffic ≈ ₹100–300/mo) |
| ACM SSL | free |
| Route 53 hosted zone | $0.50/mo (~₹45) |
| Domain (`.in`) | ~₹500–900/yr |
| **Total** | **≈ ₹100–400/month** |

---

## What's NOT here (by design — add later with the backend)
- No lead **database** or Excel export — leads live in your email inbox only.
- No **admin panel** — content (services, portfolio, testimonials) is hardcoded in
  `src/lib/api.ts` and the components; edit code + rebuild to change it.
- No **blog articles** — the blog page shows "coming soon".

When the business grows, re-enable the Django backend (its code is still in the
`K6_Interiors_Backend` repo), point `src/lib/api.ts` back at real `fetch` calls,
and you regain the database, admin, and email-from-your-domain — without redoing
the frontend.
