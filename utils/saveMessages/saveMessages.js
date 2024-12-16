exports.saveMessage = async (
  message,
  userid,
  sender = "bot",
  username,
  socketid,
  phone,
  email,
  address
) => {
  // Always create a new record
  await strapi.db.query("api::chat-support.chat-support").create({
    data: {
      message,
      userid,
      role: sender,
      userName: username,
      socketid,
      phone,
      email,
      address,
    },
  });

  return true;
};
