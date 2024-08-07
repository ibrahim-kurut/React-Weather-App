import React from 'react'
import { Watch } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className="text-center my-10 absolute  w-full flex justify-center ">
            <Watch
                visible={true}
                height="80"
                width="80"
                radius="48"
                color="#fff"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loading




