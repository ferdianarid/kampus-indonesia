import Head from 'next/head'
import UnivItem from '@components/UnivItem'
import univList from '@request/univlist.json'
import HeaderPagesInformation from '@components/HeaderPagesInformation'

const university = () => {
    return (
        <>
            <Head>
                <title>Informasi Kampus / Jurusan</title>
            </Head>
            <div>
                <HeaderPagesInformation title="Informasi Kampus / Jurusan" uploadPagePath={''} />
                <div className="bg-white rounded-md mt-8">
                    <div className=" border-gray-300">
                        <div className="p-4 flex justify-between">
                            <div className="flex items-center">
                                <label className="flex justify-start items-start">
                                    <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
                                        <input type="checkbox" className="opacity-0 absolute" />
                                        <svg className="fill-current hidden w-4 h-4 text-primary pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                                    </div>
                                </label>
                                <label htmlFor="selectAll" className="text-lg ml-2">
                                    Select All
                                </label>
                            </div>
                            <div className="flex items-center">
                                <label className="mr-3">Filter By</label>
                                <select className="border-2 border-gray-300 px-3 py-1 rounded-md min-w-[190px] mr-3">
                                    <option value="">All post</option>
                                </select>
                                <input className="bg-search border-2 border-gray-300 px-3 pl-8 py-1 rounded-md min-w-[190px]" placeholder="Search" />
                            </div>
                        </div>
                        {
                            univList.map(({ id, name, address, img }) => (
                                <UnivItem key={id} name={name} address={address} img={img} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default university