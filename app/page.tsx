import Canvas3D from '../app/components/Canvas3D';
import ItemSelector from '../app/components/UI/ItemSelector';
import Summary from '../app/components/UI/Summary';

const Page = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0f0f0f] text-white">
      <Canvas3D />

      <div className="absolute top-6 left-6">
        <ItemSelector />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Summary />
      </div>
    </div>
  );
};

export default Page;
