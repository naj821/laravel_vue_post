import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useRouter } from "vue-router";

export const usePostsStore = defineStore("postsStore", {
    state: () => {
        return {
            errors: {},
            router: useRouter(),
            loading: false,
        }
    },
    actions: {
        /*********** GET ALL POST ******************/
        async getAllPosts() {
            this.loading = true;
            const res = await fetch("/api/posts");
            const data = await res.json();
            this.loading = false;
            if(data.errors){
                this.errors = data.errors
            } else {
                console.log(data);
                return data;
            }
        },
        /*********** GET A POST ******************/
        async getPost(post) {
            this.loading = true;
            const res = await fetch(`/api/posts/${post}`);
            const data = await res.json();
            this.loading = false;
            if(data.errors){
                this.errors = data.errors
            } else {
                console.log(data);
                return data.post;
            }
        },
        /*********** CREATE A POST ******************/
        async createPost(formData) {
            this.loading = true;
            const res = await fetch("/api/posts", {
                method: "post",
                headers: {
                    "Content-Type" : "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            
            if(res.ok){
                console.log(data);
                this.router.push({name: "home"});
                
            } else {
                this.errors = data.errors
            }
            this.loading = false;
        },
         /*********** UPDATE A POST ******************/
        async updatePost(post, formData) {
            this.loading = true;
            const res = await fetch(`/api/posts/${post.id}`, {
                method: "put",
                headers: {
                    "Content-Type" : "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            
            if(res.ok){
                this.errors = {};
                this.router.push({name: "home"});
            } else {
                this.errors = data.errors
            }
            this.loading = false;
        },
         /*********** DELETE A POST ******************/
        async deletePost(post) {
            this.loading = true;
            const authStore = useAuthStore();

            if(authStore.user.id === post.user_id){
                const res = await fetch(`/api/posts/${post.id}`, {
                    method: "delete",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
    
                const data = await res.json();
                console.log(data);
    
                if(res.ok){
                    this.router.push({name: "home"});
                } else {
                    this.errors = data.errors;
                }
            }
            this.loading = false;
        },
        /*********** SEARCH A POST ******************/
        async searchPost(post) {
            this.loading = true;
            const res = await fetch(`/api/search?query=${post}`);
            const data = await res.json();
            this.loading = false;

            if(res.ok){
                return data;
            } else {
                this.errors = data;
                return [];
            }
        },
    }
})