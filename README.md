# portfolio website

This is my personal website [live site here](https://www.justinmemphis.com).

[![Sync to AWS](https://github.com/Justinmemphis/portfolio-website/actions/workflows/s3sync.yml/badge.svg)](https://github.com/Justinmemphis/portfolio-website/actions/workflows/s3sync.yml)

## How It's Made:
I used a template from [HTML5UP](https://www.html5up.net).  The actual live website is hosted on an AWS Cloudfront Distribution serving content from a S3 bucket.

## Optimizations:
Using a template definitely improved the time to go live.  Using AWS was much harder than using Netlify (what I used before), but ultimately it was worth it for what I learned.

## Lessons Learned:
I learned a lot about DNS, CDNs, and other networking, routing, and deployment things from putting this on AWS.

## Future Changes
12/27/24 - added AWS Cloudfront invalidation (with S3 sync) - appears to be working
