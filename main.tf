//init google cloud run

provider "google" {
  project = "focuser-376817"
  region  = "us-central1"
}

resource "google_cloud_run_service" "front_end" {
  name     = "client"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/focuser-376817/client:latest"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.front_end.location
  project     = google_cloud_run_service.front_end.project
  service     = google_cloud_run_service.front_end.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

# Path: outputs.tf
output "cloud_run_service_url" {
  value = google_cloud_run_service.front_end.status[0].url
}
