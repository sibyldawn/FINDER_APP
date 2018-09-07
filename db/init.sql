drop table if exists users CASCADE;
drop table if exists connections CASCADE;
drop table if exists chat_rooms CASCADE;
drop table if exists industry_codes CASCADE;
drop table if exists user_industry_codes CASCADE;

select * from users;
select * from connections;
select * from chat_rooms;
select * from industry_codes;
select * from user_industry_codes;

create table users (
id serial primary key,
auth0_id text unique not null,
first_name text,
last_name text,
picture text,
email text,
isApplicant boolean,
isRecruiter boolean,
current_job text,
industry_code text,
looking_for text,
preferred_location text,
current_zipcode integer,
work_history text,
education_background text,
bio text,
active boolean,
attachment text
);


create table connections(
id serial primary key,
recruiter_id text,
applicant_id text,
recruiter_decision boolean,
applicant_decision boolean
);

create table messages(
id serial primary key,
connection_id integer references connections(id),
date timestamp,
message text,
sender integer references users(id)
);


create table industry_codes(
id serial primary key,
industry_name text,
industry_for text
)

create table user_industry_codes(
id serial primary key,
user_id integer references users(id),
industry_code integer references industry_codes(id)
)

create table chat_rooms(
id serial primary key,
connection_id integer references connections(id),
room_id integer,
room_name text
)


insert into users
(auth0_id,first_name,last_name,picture,email,current_job,looking_for,preferred_location,current_zipcode,work_history,education_background,bio,active,attachment,industry_code,isApplicant,isRecruiter)
values
('A1','User1','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1535495464/Products/homer.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85001','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','true','false'),
('A2','User2','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534804405/Products/llgxbftcsdvuytb89jll.png','homer@simpson.com','Safety Inspector','Any Job','AZ','85002','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','true','false'),
('A3','User3','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195194/Products/veup0wmoh0k2nhfg8mxo.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85003','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','true','false'),
('A4','User4','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195080/Products/idgit8tilakwlo48112h.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85004','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','true','false'),
('A5','User5','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194995/Products/drhcy5met0v6xw3pfckd.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85001','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','true','false'),
('A6','User6','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194919/Products/x8gttworqd4mhijzspty.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85002','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Online Media','true','false'),
('A7','User7','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194879/Products/l9x4a5zin19atnjsv53d.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85003','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Online Media','true','false'),
('A8','User8','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194843/Products/xluwskbgyvipvvqjfi63.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85004','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Online Media','true','false'),
('A9','User9','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534804405/Products/llgxbftcsdvuytb89jll.png','homer@simpson.com','Safety Inspector','Any Job','AZ','85001','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','true','false'),
('A10','User10','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195194/Products/veup0wmoh0k2nhfg8mxo.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85002','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','true','false'),
('A11','User11','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534195080/Products/idgit8tilakwlo48112h.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85003','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','true','false'),
('A12','User12','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194995/Products/drhcy5met0v6xw3pfckd.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85004','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','true','false'),
('A13','User13','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194919/Products/x8gttworqd4mhijzspty.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85001','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','true','false'),
('A14','User14','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194879/Products/l9x4a5zin19atnjsv53d.jpg','homer@simpson.com','Safety Inspector','Any Job','AZ','85002','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','true','false'),
('A15','User15','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534804405/Products/llgxbftcsdvuytb89jll.png','homer@simpson.com','Safety Inspector','Any Job','AZ','85003','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','true','false'),
('A16','User16','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194995/Products/drhcy5met0v6xw3pfckd.jpg.png','homer@simpson.com','Safety Inspector','Any Job','AZ','85004','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','true','false'),
('R3','Recruiter3','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534804405/Products/llgxbftcsdvuytb89jll.png','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85001','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','false','true'),
('R4','Recruiter4','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194797/Products/eeuxgp3xf10rfunyhwfx.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85002','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','false','true'),
('R5','Recruiter5','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194761/Products/j1696skahk640zdduj1t.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85004','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Oil and Energy','false','true'),
('R6','Recruiter6','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194710/Products/hqjsdkbn0ocbtoe6ruvu.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85005','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Online Media','false','true'),
('R7','Recruiter7','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194670/Products/lmoxafif6cztsdp13gb4.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85006','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Online Media','false','true'),
('R8','Recruiter8','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194619/Products/zvdjy2xd0olakqd5130f.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85002','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Online Media','false','true'),
('R9','Recruiter9','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194379/Products/g9pzkgdbiujkfb6xkyew.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85001','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','false','true'),
('R10','Recruiter10','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194919/Products/x8gttworqd4mhijzspty.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85003','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','false','true'),
('R11','Recruiter11','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534804405/Products/llgxbftcsdvuytb89jll.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85004','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','false','true'),
('R12','Recruiter12','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194797/Products/eeuxgp3xf10rfunyhwfx.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85005','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Sporting Goods','false','true'),
('R13','Recruiter13','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194761/Products/j1696skahk640zdduj1t.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85002','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','false','true'),
('R14','Recruiter14','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194710/Products/hqjsdkbn0ocbtoe6ruvu.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85003','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','false','true'),
('R15','Recruiter15','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194670/Products/lmoxafif6cztsdp13gb4.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85004','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','false','true'),
('R16','Recruiter16','Last1','https://res.cloudinary.com/djsmw5c9x/image/upload/v1534194379/Products/g9pzkgdbiujkfb6xkyew.jpg','homer@simpson.com','Safety Inspector','Job ID 21343253: Fulltime','AZ','85005','Springfield Nuclear Plant','BS Nuclear Science','Looking for a country with free beer.','true','resume.png','Law Enforcement','false','true');


select * from industry_codes


alter TABLE industry_codes drop industry_for

insert into industry_codes( industry_name ) values 
('Airlines/Aviation'),('Alternative Dispute Resolution'),('Alternative Medicine'),('Animation'),('Apparel & Fashion'),('Architecture & Planning'),('Arts and Crafts'),('Automotive'),('Aviation & Aerospace'),('Banking'),('Biotechnology'),('Broadcast Media'),('Building Materials'),('Business Supplies and Equipment'),('Capital Markets'),
('Capital Markets'),('Chemicals'),('Civic & Social Organization'),('Civil Engineering'),('Commercial Real Estate'),('Computer & Network Security'),('Computer Games'),('Computer Hardware'),('Computer Networking'),('Computer Software'),('Construction'),('Consumer Electronics'),('Consumer Goods'),('Consumer Services'),('Cosmetics'),
('Dairy'),('Defense & Space'),('Design'),('Education Management'),('E-Learning'),('Electrical/Electronic Manufacturing'),('Entertainment'),('Environmental Services'),('Events Services'),('Executive Office'),('Facilities Services'),('Farming'),('Financial Services'),('Fine Art'),('Fishery'),('Food & Beverages'),
('Food Production'),('Fund-Raising'),('Furniture'),('Gambling & Casinos'),('Glass, Ceramics & Concrete'),('Government Administration'),('Government Relations'),('Graphic Design'),('Health, Wellness and Fitness'),('Higher Education'),('Hospital & Health Care'),('Hospitality'),('Human Resources'),('Import and Export'),
('Individual & Family Services'),('Industrial Automation'),('Information Services'),('Information Technology and Services'),('Insurance'),('International Affairs'),('International Trade and Development'),('Internet'),('Investment Banking'),('Investment Management'),
('Judiciary'),('Law Enforcement'),('Law Practice'),('Legal Services'),('Legislative Office'),('Leisure, Travel & Tourism'),('Libraries'),('Logistics and Supply Chain'),('Luxury Goods & Jewelry'),('Machinery'),('Management Consulting'),('Maritime'),('Market Research'),('Marketing and Advertising'),('Mechanical or Industrial Engineering'),('Media Production'),
('Medical Devices'),('Medical Practice'),('Mental Health Care'),('Military'),('Mining & Metals'),('Motion Pictures and Film'),('Museums and Institutions'),('Music'),('Nanotechnology'),('Newspapers'),('Non-Profit Organization Management'),('Oil & Energy'),('Online Media'),('Outsourcing/Offshoring'),('Package/Freight Delivery'),('Packaging and Containers'),('Paper & Forest Products'),
('Performing Arts'),('Pharmaceuticals'),('Philanthropy'),('Photography'),('Plastics'),('Political Organization'),('Primary/Secondary Education'),
('Printing'),('Professional Training & Coaching'),('Program Development'),('Public Policy'),('Public Relations and Communications'),('Public Safety'),('Publishing'),('Railroad Manufacture'),('Ranching'),('Real Estate'),('Recreational Facilities and Services'),('Religious Institutions'),('Renewables & Environment'),('Research'),('Restaurants'),('Retail'),('Security and Investigations'),('Semiconductors'),
('Shipbuilding'),('Sporting Goods'),('Sports'),('Staffing and Recruiting'),('Supermarkets'),('Telecommunications'),('Textiles'),('Think Tanks'),('Tobacco'),('Translation and Localization'),('Transportation/Trucking/Railroad'),('Utilities'),('Venture Capital & Private Equity'),('Veterinary'),('Warehousing'),('Wholesale'),('Wine and Spirits'),('Wireless'),('Writing and Editing')




insert into connections
( applicant_id, recruiter_id, applicant_decision,recruiter_decision)
values 
( '1', '17','yes','no'),
('2','18','yes','yes'),
('3','19','no','yes'),
('4','20','no','no'),
('5','21','yes','yes'),
('6','22','yes','yes'),
('7','23','no','yes'),
('8','24','no','no'),
('9','25','yes','no'),
('10','26','yes','yes'),
('11','27','no','no'),
('12','28','yes','yes'),
('13','29','yes','yes'),
('14','30','yes','yes'),
('15','31','no','yes'),
('16','32','yes','no'),
('postman|3|', 'postman|2|', 'yes', null)
