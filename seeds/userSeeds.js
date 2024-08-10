const crud =require("../db/CRUDoperations");

const mockUsers = [
    { email: 'alice.smith@example.com', password: 'password123', firstName: 'Alice', lastName: 'Smith', aboutMe: 'Love coding and coffee!', picture: "BeardMan1", githubUrl: 'https://github.com/alicesmith' },
    { email: 'bob.jones@example.com', password: 'password123', firstName: 'Bob', lastName: 'Jones', aboutMe: 'Web developer and tech enthusiast.', picture: "businessMan1", githubUrl: 'https://github.com/bobjones' },
    { email: 'carol.taylor@example.com', password: 'password123', firstName: 'Carol', lastName: 'Taylor', aboutMe: 'Full-stack developer with a passion for open-source.', picture: "cyberKid4", githubUrl: 'https://github.com/caroltaylor' },
    { email: 'david.brown@example.com', password: 'password123', firstName: 'David', lastName: 'Brown', aboutMe: 'Data scientist and machine learning expert.', picture: "niceGirl1", githubUrl: 'https://github.com/davidbrown' },
    { email: 'emily.johnson@example.com', password: 'password123', firstName: 'Emily', lastName: 'Johnson', aboutMe: 'UI/UX designer with a flair for creativity.', picture: "BeardMan1", githubUrl: 'https://github.com/emilyjohnson' },
    { email: 'frank.lee@example.com', password: 'password123', firstName: 'Frank', lastName: 'Lee', aboutMe: 'DevOps engineer and cloud computing specialist.', picture: "cyberKid1", githubUrl: 'https://github.com/franklee' },
    { email: 'grace.martin@example.com', password: 'password123', firstName: 'Grace', lastName: 'Martin', aboutMe: 'Front-end developer with a focus on responsive design.', picture: "businessMan1", githubUrl: 'https://github.com/gracemartin' },
    { email: 'henry.clark@example.com', password: 'password123', firstName: 'Henry', lastName: 'Clark', aboutMe: 'Software engineer with experience in mobile apps.', picture: "niceGirl2", githubUrl: 'https://github.com/henryclark' },
    { email: 'isabella.wilson@example.com', password: 'password123', firstName: 'Isabella', lastName: 'Wilson', aboutMe: 'Database administrator and SQL expert.', picture: "businessMan1", githubUrl: 'https://github.com/isabellawilson' },
    { email: 'jack.harris@example.com', password: 'password123', firstName: 'Jack', lastName: 'Harris', aboutMe: 'Systems analyst with a passion for cybersecurity.', picture: "BeardMan1", githubUrl: 'https://github.com/jackharris' },
    { email: 'kate.miller@example.com', password: 'password123', firstName: 'Kate', lastName: 'Miller', aboutMe: 'Backend developer specializing in REST APIs.', picture: "niceGirl1", githubUrl: 'https://github.com/katemiller' },
    { email: 'liam.moore@example.com', password: 'password123', firstName: 'Liam', lastName: 'Moore', aboutMe: 'AI researcher and neural network enthusiast.', picture: "businessMan1", githubUrl: 'https://github.com/liammoore' },
    { email: 'mona.white@example.com', password: 'password123', firstName: 'Mona', lastName: 'White', aboutMe: 'Technical writer and content strategist.', picture: "BeardMan1", githubUrl: 'https://github.com/monawhite' },
    { email: 'nate.walker@example.com', password: 'password123', firstName: 'Nate', lastName: 'Walker', aboutMe: 'Game developer with a love for indie games.', picture: "niceGirl2", githubUrl: 'https://github.com/natewalker' },
    { email: 'olivia.wood@example.com', password: 'password123', firstName: 'Olivia', lastName: 'Wood', aboutMe: 'Network engineer with expertise in security protocols.', picture: "cyberKid4", githubUrl: 'https://github.com/oliviawood' },
    { email: 'paul.green@example.com', password: 'password123', firstName: 'Paul', lastName: 'Green', aboutMe: 'Cloud architect with a focus on AWS and Azure.', picture: "cyberKid1", githubUrl: 'https://github.com/paulgreen' },
    { email: 'quinn.adams@example.com', password: 'password123', firstName: 'Quinn', lastName: 'Adams', aboutMe: 'Blockchain developer and smart contract enthusiast.', picture: "niceGirl1", githubUrl: 'https://github.com/quinnadams' },
    { email: 'rachel.nelson@example.com', password: 'password123', firstName: 'Rachel', lastName: 'Nelson', aboutMe: 'Quality assurance engineer and testing expert.', picture: "niceGirl2", githubUrl: 'https://github.com/rachelnelson' },
    { email: 'samuel.baker@example.com', password: 'password123', firstName: 'Samuel', lastName: 'Baker', aboutMe: 'IT consultant with experience in enterprise systems.', picture: "cyberKid4", githubUrl: 'https://github.com/samuelbaker' },
    { email: 'tina.perez@example.com', password: 'password123', firstName: 'Tina', lastName: 'Perez', aboutMe: 'Scrum master and agile coach.', picture: "cyberKid4", githubUrl: 'https://github.com/tinaperez' },
    { email: 'ursula.james@example.com', password: 'password123', firstName: 'Ursula', lastName: 'James', aboutMe: 'Hardware engineer and robotics enthusiast.', picture: "cyberKid1", githubUrl: 'https://github.com/ursulajames' }
];

mockUsers.forEach(async user => await crud.createUser(user));