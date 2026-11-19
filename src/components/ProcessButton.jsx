

export default function ProcessButton({handelClick, error}){
    //const nav = useNavigate();
    
    // useEffect(() => {
    //     if(data && data.jobId){
    //         nav(`/process/${data.jobId}`);
    //     }
    // }, [data, nav]);

    return(
        <div className="process-button">
            <button onClick={() => handelClick()}>Process Video</button>

            {error && <p>Error: {error}</p>}
        </div>
    );
}