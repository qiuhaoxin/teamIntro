function install(app:any,options){
    console.log("app is ",app);
    console.log("options is ",options);
    if(app.vueAxiosInstalled){
        return;
    }

    app.config.globalProperties['axios']=options;
    app.vueAxiosInstalled=true;
}

export default install