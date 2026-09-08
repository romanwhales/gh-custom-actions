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

  console.log(`distFolder: ${distFolder}`);
  console.log(`bucket: ${bucket}`);
  console.log(`bucketRegion: ${bucketRegion}`);

  // 2. Upload Files
  const s3Uri = `s3://${bucket}`;
  console.log(`s3 uri ${s3Uri}`);
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  core.notice("Is this executed ?");
  core.notice("Hello from my custom Javascript Action!");
}

run();
