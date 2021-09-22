import Menus from './Menus'

const Sidebar = () => {
    return (
        <div className="w-[225px] bg-primary">
            <div className="mt-3 p-5">
                <h3 className="text-xl font-bold text-white">Dashboard</h3>
                <span className="text-sm text-white">Role : Admin</span>
            </div>
            <div className="mt-10">
                <Menus />
            </div>
        </div>
    )
}

export default Sidebar
