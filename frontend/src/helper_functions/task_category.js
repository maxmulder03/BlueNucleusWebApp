export const returnTaskCategory = (tasks = [], category = []) => {
    const data = []
    if (tasks.length === 0) return []
    tasks.forEach(task=>{
        const findCategory = category.find(item=>item.id === task.category)
        const obj =  {
            id: task.id,
            title: task.title,
            cat_id: findCategory?.id,
            category: findCategory?.title,
            description: task?.description,
            is_active: task?.isActive,
            status: findCategory?.isActive,
            original_task: task
        }
        data.push(obj)
    })

    const generalTasks = []
    const specificTasks = []

    data.forEach(item => {
        if(item.is_active === 1) generalTasks.push(item)
        else specificTasks.push(item) 
    })

    return [generalTasks, specificTasks]
}

export const returnTaskCategoryGroups = (data = []) => {
    if(data.length === 0) return []
    const results = {}
    data.forEach(item=>{
        if(results[item.category]){
            results[item.category].data.push(item)
        }else{
            results[item.category] = {
                data: [item],
                status: item.status === 1 ? true : false
            }
        }
    })
    const keys = Object.keys(results)
    const arr = []
    if(keys.length === 0) return []
    keys.forEach(key=>arr.push({name: key, status: results[key]['status'], data: results[key]['data']}))
    return arr
}

export const returnTaskCategoryDetails = (tasks = []) => {
    if (tasks.length === 0) return []

    const generalTasks = []
    const specificTasks = []

    tasks.forEach(item => {
        if(item.taskIsActive === 1) generalTasks.push(item)
        else specificTasks.push(item) 
    })

    return [generalTasks, specificTasks]
}