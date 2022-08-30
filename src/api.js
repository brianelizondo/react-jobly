import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** COMPANIES */
    /** Get details on a company by handle. */
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }
    /** Get all companies listed */
    static async getCompanies(){
        let res = await this.request(`companies/`);
        return res;
    }
    /** Find companies listed by search term */
    static async findCompanies(searchTerms){
        let res = await this.request(`companies/`, { name: searchTerms });
        return res;
    }


    /** JOBS */
    /** Get all jobs listed */
    static async getJobs(){
        let res = await this.request(`jobs/`);
        return res;
    }
    /** Find jobs listed by search term */
    static async findJobs(searchTerms){
        let res = await this.request(`jobs/`, { title: searchTerms });
        return res;
    }
    /** Apply for a job */
    static async applyJob(jobApplication){
        let res = await this.request(`users/${jobApplication.username}/jobs/${jobApplication.jobId}`, {}, "post");
        return res;
    }
    /** Un-Apply for a job */
    static async unapplyJob(jobApplication){
        let res = await this.request(`users/${jobApplication.username}/jobs/${jobApplication.jobId}`, {}, "delete");
        return res;
    }


    /** USERS */
    /** Register a new user */
    static async registerUser(user){
        let res = await this.request(`auth/register/`, user, "post");
        return res;
    }
    /** Authenticate a user */
    static async loginUser(user){
        let res = await this.request(`auth/token/`, user, "post");
        return res;
    }
    /** Get user info */
    static async getUser(user){
        let res = await this.request(`users/${user}`);
        return res.user;
    }
    /** Update user info */
    static async updateUser(user){
        const username = user.username;
        delete user.username;
        let res = await this.request(`users/${username}`, user, "patch");
        return res.user;
    }
    
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
