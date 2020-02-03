exports.mongoDS = {
    development:{
        uri:"mongodb://localhost/nodejsAuth"
    },
    production:{
        uri:"mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority"
    }
}

exports.mysqlDS = {
    development:{
        uri:"mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority"
    },
    production:{
        uri:"mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority"
    }
}