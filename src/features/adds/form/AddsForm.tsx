import { Button, Form, Header, Segment } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router"
import { useAppSelector } from "@/app/store/store.ts"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { categoryOptions } from "@/features/adds/form/categoryOptions.ts"
import DataPicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { AppEvent } from "@/app/types/event.ts"
import { arrayUnion, Timestamp } from "@firebase/firestore"
import { toast } from "react-toastify"
import { useFirestore } from "@/app/hooks/firestore/useFirestore.ts"
import { useEffect } from "react"
import { LoadingComponent } from "@/app/layout/LoadingComponent.tsx"
import { actions } from "@/features/adds/addsSlice.ts"

export default function AddsForm() {
  const { loadDocument, create, update } = useFirestore("adds")
  const { id } = useParams()
  const add = useAppSelector((state) => state.adds.data.find((e) => e.id === id))
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      if (add) return { ...add, date: new Date(add.date) }
    },
  })

  const { status } = useAppSelector((state) => state.adds)
  const { currentUser } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    loadDocument(id, actions)
  }, [id, loadDocument])

  const updateAdvertise = async (data: AppEvent) => {
    if (!add) return
    await update(data.id as string, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    })
  }
  const createAdvertise = async (data: FieldValues) => {
    if (!currentUser) return
    return await create({
      ...data,
      hostUid: currentUser?.uid,
      hostedBy: currentUser?.displayName,
      hostPhotoURL: currentUser.photoURL,
      attendees: arrayUnion({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }),
      attendeeIds: arrayUnion(currentUser.uid),
      date: Timestamp.fromDate(data.date as unknown as Date),
    })
  }

  const handleCancelToggle = async (add: AppEvent) => {
    await update(add.id as string, {
      isCancelled: !add.isCancelled,
    })
    toast.success(`Add has been ${add.isCancelled ? "uncancelled" : "cancelled"}`)
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      if (add) {
        await updateAdvertise({ ...add, ...data })
        navigate(`/adds/${add.id}`)
      } else {
        const ref = await createAdvertise(data)
        navigate(`/adds/${ref?.id}`)
      }
    } catch (error) {
      toast.error((error as unknown as Error).message as string)
    }
  }
  if (status === "loading") return <LoadingComponent />

  return (
    <>
      <Segment clearing>
        <Header content="Event details" sub color="teal" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Input
            placeholder="Event title"
            defaultValue={add?.title || ""}
            {...register("title", { required: true })}
            error={errors.title && "Title is required"}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            defaultValue={add?.category}
            render={({ field }) => (
              <Form.Select
                options={categoryOptions}
                placeholder="Category"
                clearable
                {...field}
                onChange={(_, d) => setValue("category", d.value, { shouldValidate: true })}
                error={errors.category && errors.category.message}
              />
            )}
          />

          <Form.TextArea
            placeholder="Description"
            defaultValue={add?.description || ""}
            {...register("description", { required: "Description is required" })}
            error={errors.category && errors.category.message}
          />
          <Header sub content="Location details" color="teal" />
          <Form.Input
            placeholder="City"
            defaultValue={add?.city || ""}
            {...register("city", { required: "City is required" })}
            error={errors.category && errors.category.message}
          />
          <Form.Input
            placeholder="Venue"
            defaultValue={add?.venue || ""}
            {...register("venue", { required: "Venue is required" })}
            error={errors.category && errors.category.message}
          />
          <Form.Field>
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              defaultValue={(add && new Date(add.date)) || null}
              render={({ field }) => (
                <DataPicker
                  selected={field.value}
                  onChange={(value) => setValue("date", value, { shouldValidate: true })}
                  showTimeSelect
                  timeCaption="time"
                  dateFormat="MMM d, yyyy h:mm aa"
                  placeholderText="Event date and time"
                />
              )}
            />
          </Form.Field>
          {add && (
            <Button
              type="button"
              floated="left"
              color={add.isCancelled ? "green" : "red"}
              onClick={() => handleCancelToggle(add)}
              content={add.isCancelled ? "Reactivate" : "Cancel add"}
            />
          )}
          <Button
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            floated="right"
            positive
            content="Submit"
          />
          <Button
            disabled={isSubmitting}
            as={Link}
            to="/events"
            type="button"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Segment>
    </>
  )
}
