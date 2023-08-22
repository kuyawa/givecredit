import Image from 'next/image';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Card from './Card';
import TextInput from './form/TextInput';
import Icon from './Icon';

interface DonationTierRowTypes {
  title: string;
  description?: string;
  image?: string;
  value: number;
  onClick: (string) => void;
  currency?: string;
  disabled?: boolean;
}

const DonationTierRow = ({
  title,
  image,
  value,
  currency,
  disabled,
  onClick,
  description
}: DonationTierRowTypes) => {
  // ref not working for some reason
  const textInputRef = useRef(null);
  const { register, watch } = useForm({ defaultValues: { [title]: value } });
  const [amount] = watch([title]);
  return (
    <>
      <div>{title}</div>
      <div className="text-gray-400 mb-1 text-xs">{description}</div>
      <Card className="w-full h-24 p-0 mb-4" key={title}>
        <div className="flex flex-row w-full h-full justify-between items-center">
          <div className="h-full flex flex-row items-center basis-24 aspect-square mr-2">
            <Image src={image} className="h-full" width={100} height={100} alt="" />
          </div>
          <TextInput
            ref={textInputRef}
            className="mt-0 mr-4 min-w-0"
            placeholder="XX.XX XLM"
            onFocus={() => textInputRef?.current?.select()}
            type="number"
            register={register(title)}
            disabled={disabled}
          />
          <label className="mr-4 mb-0">{currency ?? 'XLM'}</label>
          <div
            onClick={() => onClick(amount)}
            className="bg-blue-700 self-stretch rounded-r-xl flex basis-24 flex-grow-0 justify-center items-center"
          >
            <Icon icon="arrow_forward" className="cursor-pointer" />
          </div>
        </div>
      </Card>
    </>
  );
};

export default DonationTierRow;
