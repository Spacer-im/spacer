ProjectComments = new Mongo.Collection('project_comments');

ProjectComments.attachSchema(Schemas.Comment);
