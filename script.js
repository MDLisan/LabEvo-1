$(document).ready(function () {

  function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    $('#studentTable tbody').empty(); 
    students.forEach(student => {
      $('#studentTable tbody').append(`
        <tr data-id="${student.id}">
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.marks}</td>
        </tr>
      `);
    });
  }


  function saveStudents() {
    const students = [];
    $('#studentTable tbody tr').each(function () {
      const name = $(this).find('td:eq(0)').text();
      const id = $(this).data('id');
      const marks = parseFloat($(this).find('td:eq(2)').text());
      students.push({ name, id, marks });
    });
    localStorage.setItem('students', JSON.stringify(students));
  }


  loadStudents();

  $('#addBtn').click(function () {
    const name = $('#studentName').val();
    const id = $('#studentID').val();
    const marks = parseFloat($('#marks').val());

    const existingRow = $(`#studentTable tbody tr[data-id="${id}"]`);

    if (existingRow.length > 0) {
      alert('Student ID already exists. Please use a unique ID.');
      return;
    }

    if (name && id && !isNaN(marks) && marks >= 0 && marks <= 100) {
      $('#studentTable tbody').append(`
        <tr data-id="${id}">
          <td>${name}</td>
          <td>${id}</td>
          <td>${marks}</td>
        </tr>
      `);

      saveStudents();
      $('#studentName, #studentID, #marks').val('');
    } else {
      if (isNaN(marks) || marks < 0 || marks > 100) {
        alert('Please enter valid marks between 0 and 100.');
      } else {
        alert('Please fill all fields!');
      }
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
    const updatedMarks = parseFloat($('#editMarks').val());
    const id = $('#popup').data('id');

    if (!updatedName || isNaN(updatedMarks) || updatedMarks < 0 || updatedMarks > 100) {
      alert('Please provide valid name and marks between 0 and 100.');
      return;
    }

    const row = $(`#studentTable tbody tr[data-id="${id}"]`);
    row.find('td:eq(0)').text(updatedName);
    row.find('td:eq(2)').text(updatedMarks);

    saveStudents(); 
    $('#popup').hide();
  });
});
