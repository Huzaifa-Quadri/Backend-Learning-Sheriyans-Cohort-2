export default function registerController(req, res, next) {
  try {
    throw new Error("Encounter an Error while registering a new User!");
  } catch (e) {
    next(e);
  }
}
