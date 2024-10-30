import Swal from "sweetalert2";

const smallToast = Swal.mixin({
  toast: true,
  position: "bottom-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export async function showWarningToast(message) {
  await smallToast.fire({
    icon: "warning",
    title: message,
  });
}
export async function showErrorToast(message) {
  await smallToast.fire({
    icon: "error",
    iconColor: "red",
    title: message,
  });
}
export async function showSuccessToast(message) {
  await smallToast.fire({
    icon: "success",
    iconColor: "green",
    title: message,
  });
}
