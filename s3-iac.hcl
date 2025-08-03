
resource "aws_iam_user" "springboot_app_user" {
  name = "springboot-app-user"
}


resource "aws_iam_access_key" "springboot_app_access_key" {
  user = aws_iam_user.springboot_app_user.name
}


resource "aws_iam_user_policy" "springboot_app_policy" {
  name = "springboot-app-policy"
  user = aws_iam_user.springboot_app_user.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ],
        Resource = [
          aws_s3_bucket.primer_bucket.arn,
          "${aws_s3_bucket.primer_bucket.arn}/*"
        ]
      }
    ]
  })
}

output "s3_access_key_id" {
  value     = aws_iam_access_key.springboot_app_access_key.id
  sensitive = true
}

output "s3_secret_access_key" {
  value     = aws_iam_access_key.springboot_app_access_key.secret
  sensitive = true
}