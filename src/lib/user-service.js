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

  editUser = (id, username, image, dateOfBirth, phoneNumber, aboutBio) => {
      
    const pr = this.api.put(`/user/${id}`, {username, image, dateOfBirth, phoneNumber, aboutBio})
    return pr;
  }

  deleteUser = (id) => {
    const pr = this.api.delete(`/user/${id}` )

    return pr;
  }

  

}

const userService = new UserService();

export default userService;