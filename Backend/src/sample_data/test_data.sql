use `my_library`;
-- users -- 
INSERT INTO USERS(id,username,personalName,password,isDeleted)
VALUES(1,'john','John Smith','hashPass1',0);

INSERT INTO USERS(username,personalName,password,isDeleted)
VALUES('mary.lewis14','Mary Lewis','hashPass2',0);

INSERT INTO USERS(username,personalName,password,isDeleted)
VALUES('nick55','Nicholas Joseph','hashPass3',0);

INSERT INTO USERS(username,personalName,password,isDeleted)
VALUES('anne-marie91','Anne-Marie Nicholson','hashPass4',0);

INSERT INTO USERS(username,personalName,password,isDeleted)
VALUES('alex.pet1','Alexander Peterson','hashPass5',0);

-- books --
INSERT INTO BOOKS(id,name,author,borrowerId)
VALUES(1,'And then there were none', 'Agatha Christie',NULL);

INSERT INTO BOOKS(id,name,author,borrowerId)
VALUES(2,'The Shining', 'Stephen King',5);

INSERT INTO BOOKS(id,name,author,borrowerId)
VALUES(3,'The Da Vinci Code', 'Dan Brown',NULL);

INSERT INTO BOOKS(id,name,author,borrowerId)
VALUES(4,'Digital Fortress', 'Dan Brown',NULL);

INSERT INTO BOOKS(id,name,author,borrowerId)
VALUES(5,'Harry Potter and the Sorcer\'s Stone', 'JK Rowling',2);


-- reviews -- 
INSERT INTO REVIEWS(id,text,bookNameId,madeById,isDeleted)
VALUES(100,'Such a thrilling book! Kept me on the edge of my seat all of the time!',1,1,0);

INSERT INTO REVIEWS(id,text,bookNameId,madeById,isDeleted)
VALUES(200,'Strongly reccomend reading it!',1,3,0);

INSERT INTO REVIEWS(id,text,bookNameId,madeById,isDeleted)
VALUES(300,'Enjoyed this book both as a kid and now! My all time favourite sequence',5,2,0);

INSERT INTO REVIEWS(id,text,bookNameId,madeById,isDeleted)
VALUES(400,'Masterpiece',2,3,0);

-- review_reactions
INSERT INTO REVIEW_REACTIONS(id,madeById,reviewVotedForId,reactionType)
VALUES(101,4,100,1);

INSERT INTO REVIEW_REACTIONS(madeById,reviewVotedForId,reactionType)
VALUES(4,200,1);

INSERT INTO REVIEW_REACTIONS(madeById,reviewVotedForId,reactionType)
VALUES(1,200,1);

INSERT INTO REVIEW_REACTIONS(madeById,reviewVotedForId,reactionType)
VALUES(3,400,1);


-- ratings -- 

INSERT INTO RATINGS(id,points,bookNameId,madeById)
VALUES(1000,3,3,1);

INSERT INTO RATINGS(points,bookNameId,madeById)
VALUES(5,3,1);

INSERT INTO RATINGS(points,bookNameId,madeById)
VALUES(2,4,2);

INSERT INTO RATINGS(points,bookNameId,madeById)
VALUES(3,5,2);

INSERT INTO RATINGS(points,bookNameId,madeById)
VALUES(4,1,4);
