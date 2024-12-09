export const defaultResponseGenerator = (res, instance = 'instance', verb = 'to do', doneVerb = 'done') => {
  return {
    res: res,
    instance: instance,
    verb: verb,
    doneVerb: doneVerb
  };
};

export const successfulResponseGenerator = ({ res, status = 200, data = 'data', instance, doneVerb }) => {
  res.status(status).json({
    status: `OK`,
    message: `${instance.toUpperCase()} ${doneVerb.toUpperCase()} successfully`,
    data: data
  });
  console.log(`The ${instance.toUpperCase()} has been ${doneVerb.toUpperCase()} successfully`);
};

export const errorResponseGenerator = ({ res, status = 400, error = 'error', instance, verb }) => {
  res.status(status).json({
    status: `ERROR`,
    message: `Could not ${verb.toUpperCase()} the ${instance.toUpperCase()}`,
    data: undefined,
  });
  console.error(`Error trying to ${verb.toUpperCase()} the ${instance.toUpperCase()}\n`, error);
};