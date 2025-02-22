import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            user: null,
            errors: {},
            router: useRouter(),
            loading: false,
        }
    },
    actions: {
        //*************** LOGIN OR REGISTER USE **********************/
        async authenticate(apiRoute, formData) {
            this.loading = true;
            const res = await fetch(`/api/${apiRoute}`, {
                method: "post",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            
            if(data.errors){
                this.errors = data.errors
            } else {
                this.errors = {};
                localStorage.setItem('token', data.token);
                this.user = data.user;
                console.log("User has been logged in");
                this.router.push({ name: "home" });
            }
            this.loading = false;
        },
        //**************** GET AUTHENTICATED USER ******************* */
        async getUser() {
            if(localStorage.getItem("token")) {
                const res = await fetch("/api/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();
                if(res.ok) {
                    this.user = data;
                }
            }
        },
        //*********************** LOG OUT USER **********************/
        async logout() {
            this.loading = true;
            if(localStorage.getItem("token")) {
                const res = await fetch("/api/logout", {
                    method: "post",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();
                this.loading = false;
                if(res.ok) {
                    this.user = null;
                    this.errors = {};
                    localStorage.removeItem("token");
                    console.log("User has been logged out");
                    this.router.push({name: "login"})
                    
                }
                console.log(data);
            }
            
        }
    }
})