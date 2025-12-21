import Card from "./Card";

export default function CardContainer({nfts}) {
  console.log("nfts",nfts);

  return (

    <div>
      <Dashboard nfts={nfts}/>
    </div>
  );
}
const Dashboard = ({nfts}) => {
  console.log("nfts",nfts);
  return (
    <div className="flex flex-1 h-full">
      <div className="p-2 md:p-10  border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black flex flex-col gap-2 flex-1 w-full h-full">
        <div className="z-0 flex gap-2 flex-wrap h-full overflow-y-scroll justify-center" style={{scrollbarWidth:"none"}}>
          {nfts?.map((i) => (
            <Card
              key={"first-array" + i}
              tokenId={i[0].toString()}
            ></Card>
          ))}
        </div>

      </div>
    </div>
  );
};
