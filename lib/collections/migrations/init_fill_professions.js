const migrationName = "initFillProfessions";

Migrations.Names.INIT_FILL_PROFESSIONS = migrationName;

const DATA = [
    "Accountant",
    "Fiscal Analyst",
    "Marketing Manager",
    "PR Manager",
    "Communications",
    "IT Administrator",
    "Product Manager",
    "Project Manager",
    "Community Manager",
    "Purchaser",
    "Business Analyst",
    "Human Resources",
    "Event Planner",
    "Veterinary",
    "Architect",
    "Biologist",
    "Chemist",
    "City Planner",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Geologist",
    "Geophysicist",
    "Product Designer",
    "Medic",
    "Pharmacist",
    "Physician",
    "Surgeon",
    "Psychologist",
    "Software Engineer",
    "Web Developer",
    "Programmer",
    "Cybersecurity",
    "Security Analyst",
    "System Administrator",
    "Systems Architect",
    "Hardware Engineer",
    "UI Engineer",
    "Robotics Engineer",
    "Quality Assessment",
    "Industrial Engineer",
    "Agrologist",
    "Geologist",
    "Geospatial Analyst",
    "Real Estate agent",
    "Lawyer",
    "Teacher",
    "Economist",
    "Graphic Designer"
];

Migrations.Data[migrationName] = {
    migrationFunction: function (callback) {
        let data = DATA.map((el) => {
            return {name: el};
        });
        callback = callback || (() => {});
        bulkCollectionUpdate(Professions, data, {
            primaryKey: "name",
            callback: callback
        });
    }
};