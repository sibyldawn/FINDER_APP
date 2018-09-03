insert into connections (applicant_id, recruiter_id, applicant_decision, recruiter_decision)
values(${applicantId}, ${recruiterId}, ${applicantDecision}, ${recruiterDecision});

select * from connections
where applicant_id = ${applicantId}
and recruiter_id = ${recruiterId};