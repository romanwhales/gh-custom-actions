import * as core from "@actions/core";
// import * as github from "@actions/github";
import * as exec from "@actions/exec";

function run() {
  // 1. get some input values
  const bucket = core.getInput("bucket", {
    required: true,
  });
  const bucketRegion = core.getInput("bucket-region", {
    required: false,
  });
  const distFolder = core.getInput("dist-folder", {
    required: false,
  });

  // 2. Upload Files
  const s3Uri = `s3://${bucket}`;
  console.log(`s3 uri ${s3Uri}`);
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
}

run();
