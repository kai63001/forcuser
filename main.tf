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
        image = "gcr.io/focuser-376817/client:0.2.1"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

}

resource "google_cloud_run_service" "back_end" {
  name     = "backend"
  location = "us-central1"

  template {
    spec {
      containers {
        ports {
          container_port = 4000
        }
        image = "gcr.io/focuser-376817/server:0.1"
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

resource "google_cloud_run_service_iam_policy" "noauth_back_end" {
  location    = google_cloud_run_service.back_end.location
  project     = google_cloud_run_service.back_end.project
  service     = google_cloud_run_service.back_end.name

  policy_data = data.google_iam_policy.noauth.policy_data
}


# Path: outputs.tf
output "cloud_run_service_url" {
  value = google_cloud_run_service.front_end.status[0].url
}

output "cloud_run_service_url_back_end" {
  value = google_cloud_run_service.back_end.status[0].url
}