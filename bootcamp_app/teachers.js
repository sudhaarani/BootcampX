const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const val = process.argv.slice(2)[0];
console.log("val:", val);

pool.query(`
SELECT DISTINCT teachers.name as teacher,cohorts.name as cohort,COUNT(teachers.id) AS total_assistances
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts on cohorts.id = students.cohort_id
WHERE cohorts.name='${process.argv.slice(2)[0]}'
GROUP BY teacher,cohort
ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort} : ${user.teacher} `);
    })
  })
  .catch(err => console.error('query error', err.stack));