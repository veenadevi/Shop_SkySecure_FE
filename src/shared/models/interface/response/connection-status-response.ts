export interface ConnectionStatusResponse {

    connection : connectionModal;

  } 

export interface connectionModal {
    connectionStatus : boolean;
    userId : string;
}