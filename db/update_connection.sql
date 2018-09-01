update connections
set applicant_decision = ${applicantDecision}, recruiter_decision = ${recruiterDecision}
where id = ${id};

select * from connections
where id = ${id}