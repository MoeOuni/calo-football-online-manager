import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { priceSchema, type PriceFormValues } from "@/lib/schemas";
import { IPlayerPopulated } from "@/lib/interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

export const SellPlayerDialog = ({
  record,
  isDialogOpen,
  setIsDialogOpen,
}: {
  record: IPlayerPopulated;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      playerId: record._id,
      price: undefined,
    },
  });

  const onSubmit = (data: PriceFormValues) => {
    console.log(data);
    // Here you would typically handle the form submission, e.g., send to an API
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            List <strong>{record?.name}</strong> for Sale
          </DialogTitle>
          <DialogDescription>
            Once a player is sold you get 95% of the original price.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Enter selling price"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Popover open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <PopoverTrigger asChild>
                  <Button type="button">List for Sale</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        Confirm Listing
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Are you sure you want to list {record?.name} for sale at{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(form.getValues().price ?? 0)}
                        {" "}?
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsConfirmOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
