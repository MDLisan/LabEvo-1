$(document).ready(function () {
  $('#addBtn').click(function () {
    const name = $('#name').val();
    const id = $('#id').val();
    const marks = $('#marks').val();

    if (name && id && marks) {
      $('#studentTable tbody').append(`
        <tr data-id="${id}">
          <td>${name}</td>
          <td>${id}</td>
          <td>${marks}</td>
        </tr>
      `);

      $('#name, #id, #marks').val('');
    } else {
      alert('Please fill all fields!');
    }
  });

  $('#modifyBtn').click(function () {
    const searchId = $('#searchId').val();
    const row = $(`#studentTable tbody tr[data-id="${searchId}"]`);

    if (row.length > 0) {
      $('#editName').val(row.find('td:eq(0)').text());
      $('#editMarks').val(row.find('td:eq(2)').text());
      $('#popup').data('id', searchId).show();
    } else {
      alert('ID not found!');
    }
  });

  $('#updateBtn').click(function () {
    const updatedName = $('#editName').val();
    const updatedMarks = $('#editMarks').val();
    const id = $('#popup').data('id');

    const row = $(`#studentTable tbody tr[data-id="${id}"]`);
    row.find('td:eq(0)').text(updatedName);
    row.find('td:eq(2)').text(updatedMarks);

    $('#popup').hide();
  });
});
