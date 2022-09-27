
// Kiem tra neu dung la admin thi cho them category, chi admin duoc chinh sua

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).send({ message: "User Access denied!" });
    }
    next();
};

exports.adminMiddleware = (req, res, next) =>{
  if(req.user.role !== "admin"){
       res.status(400).send({message: 'Admin Access denied!'})
  }
  next()
};