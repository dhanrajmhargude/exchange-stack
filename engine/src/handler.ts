import type {EngineRequest} from "./types/engine-message"

export function handleEngineRequest(request:EngineRequest): unknown {
    switch(request.type){
        case "create_order":
        
        return {
            orderId: "stub-order-id",
            status: "filled",
            fills: [],
        };
        case "cancel_order":
        case "get_depth":
        case "get_order":
        case "get_user_balance":       
    }
}