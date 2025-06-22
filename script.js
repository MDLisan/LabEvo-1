$(document).ready(function () {

  function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    $('#studentTable tbody').empty(); 
    students.forEach(student => {
      $('#studentTable tbody').append(`
        <tr data-id="${student.id}">
          
          <td>${student.id}</td>
          <td>${student.marks}</td>
        </tr>
      `);
    });
  }


  function saveStudents() {
    const students = [];
    $('#studentTable tbody tr').each(function () {
      
      const id = $(this).data('id');
      const marks = parseFloat($(this).find('td:eq(2)').text());
      students.push({ id, marks });
    });
    localStorage.setItem('students', JSON.stringify(students));
  }


  loadStudents();

  $('#addBtn').click(function () {
    
    const id = $('#studentID').val();
    const marks = parseFloat($('#marks').val());

    const existingRow = $(`#studentTable tbody tr[data-id="${id}"]`);

    if (existingRow.length > 0) {
      alert('Student ID already exists. Please use a unique ID.');
      return;
    }

    if (id && !isNaN(marks) && marks >= 0 && marks <= 100) {
      $('#studentTable tbody').append(`
        <tr data-id="${id}">
         
          <td>${id}</td>
          <td>${marks}</td>
        </tr>
      `);

      saveStudents();
      $('#studentID, #marks').val('');
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
      
      $('#editMarks').val(row.find('td:eq(2)').text());
      $('#popup').data('id', searchId).show();
    } else {
      alert('ID not found!');
    }
  });

  $('#updateBtn').click(function () {
    
    const updatedMarks = parseFloat($('#editMarks').val());
    const id = $('#popup').data('id');

    if (isNaN(updatedMarks) || updatedMarks < 0 || updatedMarks > 100) {
      alert('Please provide valid marks between 0 and 100.');
      return;
    }

    const row = $(`#studentTable tbody tr[data-id="${id}"]`);
  
    row.find('td:eq(2)').text(updatedMarks);

    saveStudents(); 
    $('#popup').hide();
  });
});
