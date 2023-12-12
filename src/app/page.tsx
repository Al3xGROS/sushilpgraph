import DataTable from "@/components/DataTable"

function Dashboard() {
    return (
        <div className="w-full h-screen bg-stone-100 py-5">
			<div className="flex-col justify-center items-center text-center mx-auto mb-5">
				<h1 className="text-2xl mb-4">Dashboard</h1>
				<p>Enter the id of a sushi swap v2 liquidity pool id and find out the top 3 major wallets</p>
			</div>
			<DataTable />
        </div>
    )
}

export default Dashboard
