import axios from "axios";


class UserService {
  constructor() {
    
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });
  }

  getUser = (id) => {
    const pr = this.api.get(`/user/${id}`)
    return pr;
  }

  editUser = (username, image, phoneNumber, aboutBio) => {
    const pr = this.api.put(`/user`, {username, image, phoneNumber, aboutBio})
    return pr;
  }

  deleteUser = (id) => {
    const pr = this.api.delete(`/user/${id}` )
    return pr;
  }

  

}

const userService = new UserService();

export default userService;