export function successElement(id: string, successMessage: string) {
  const button = document.getElementById(id);
  if (button != null) {
    button.textContent = "Joined";
    button.className = "btn btn-success";
  }
}

export function loadingElement(id: string) {
  const button = document.getElementById(id);
  if (button != null) {
    button.textContent = "Loading";
    button.className = "btn btn-warning";
  }
}

export function errorElement(id: string) {
  const button = document.getElementById(id);
  if (button != null) {
    button.textContent = "Error";
    button.className = "btn btn-error";
  }
}
