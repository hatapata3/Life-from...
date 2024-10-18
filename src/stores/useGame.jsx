import { create } from "zustand"
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {
        page: 0,

        setPage: (target) =>
        {
            set((state) =>
            {
                if(state.page != target)
                        return { page: target }

                return {}
            })
        },
    }
}))