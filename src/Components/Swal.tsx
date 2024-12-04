import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  iconHtml: `X`,
  showConfirmButton: false,
  customClass: {
    popup: "colored-toast",
  },
  timer: 2000,
  timerProgressBar: true,
});
