import Image from 'next/image';
import { Organization } from 'types/registryTypes';

export default function OrganizationList({
  organizations,
  onOrgPress
}: {
  organizations: Organization[];
  onOrgPress: (org: Organization) => void;
}) {
  return (
    <div className="px-6 mt-4">
      {organizations.map((organization) => { 
        console.log({organization})
        //organization.image = '/media/support_ukrainian_refugees.png' // TODO: REMOVE
        return (
        <div
          className="rounded-xl self-center justify-center py-6 relative overflow-hidden"
          // style={{ backgroundColor: organization.bg_color }}
          key={organization.id}
        >
          <button onClick={() => onOrgPress(organization)}>
            <div className="flex flex-col">
              <Image
                src={organization.image}
                alt={`${organization.name} Logo`}
                className="self-center mb-4"
                width={495}
                height={100}
              />
              <h3 className="font-bold text-center z-10">
                {organization.name}
              </h3>
            </div>
          </button>
          <div className="bg-gradient-to-b from-transparent to-black absolute top-2/3 left-0 right-0 bottom-0 z-0" />
        </div>
       )}
      )}
    </div>
  );
}
