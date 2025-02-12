import sequelize from '../config/dbsetup';
import Person from './Person';
import Role from './Role';
import Competence from './Competence';
import CompetenceProfile from './CompetenceProfile';
import Availability from './Availability';
import Status from './Status';
import Application from './Applications';




// Define Relationships between tables

// one-to-many relationship between person-role
Person.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(Person, { foreignKey: 'role_id' });

// one-to-many relationship 
Person.hasMany(CompetenceProfile, { foreignKey: 'person_id' });
CompetenceProfile.belongsTo(Person, { foreignKey: 'person_id' });

// one-to-many... ?? 
Person.hasMany(Availability, { foreignKey: 'person_id' });
Availability.belongsTo(Person, { foreignKey: 'person_id' });

// one-to-one
Person.hasOne(Application, { foreignKey: 'person_id' });
Application.belongsTo(Person, { foreignKey: 'person_id' });


//one-to-many relationship
Competence.hasMany(CompetenceProfile, { foreignKey: 'competence_id' });
CompetenceProfile.belongsTo(Competence, { foreignKey: 'competence_id' });

// one-to-many
Status.hasMany(Application, {foreignKey: 'status_id'});
Application.belongsTo(Status, { foreignKey: 'status_id' });

export { sequelize, Person, Role, Competence, CompetenceProfile, Availability, Status, Application };
