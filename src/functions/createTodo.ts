import { document } from "src/utils/dynamodbClient";
import dayjs from "dayjs";
import {validate} from 'uuid'


interface ICreateTodoDTO {
    id: string;
    title: string;
    deadline: Date
}

export const handle = async (event) => {
    const {userId} = event.pathParameters;
    const {id, title, deadline} = JSON.parse(event.body) as ICreateTodoDTO;

    if (!validate(id) || !validate(userId)) return { statusCode: 400 };

    await document
    .put({
        TableName: "todos",
        Item: {
        id,
        user_id: userId,
        title,
        done: false,
        deadline: dayjs(deadline).toDate()
        },
    })
    .promise();
    
    return {
        statusCode: 201
    };
}