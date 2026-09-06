export const buildAuditEntry = ({
  userId,
  action,
  entity,
  entityId,
  oldData = null,
  newData = null,
  req,
}) => {
  const ip = req?.ip || null;
  const userAgent = req?.headers?.['user-agent'] || null;
  return {
    userId,
    action,
    entity,
    entityId,
    oldData: oldData ? JSON.stringify(oldData) : null,
    newData: newData ? JSON.stringify(newData) : null,
    ip,
    userAgent,
    timestamp: new Date(),
  };
};

