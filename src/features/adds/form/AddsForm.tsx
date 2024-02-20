import { Button, Form, Header, Segment } from "semantic-ui-react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router"
import { useAppSelector } from "@/app/store/store.ts"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { categoryOptions } from "@/features/adds/form/categoryOptions.ts"
import DataPicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { AppEvent } from "@/app/types/event.ts"
import { db } from "@/app/config/firebase.ts"
import { collection, doc, setDoc, Timestamp, updateDoc } from "@firebase/firestore"
import { toast } from "react-toastify"

export default function AddsForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onTouched" })
  const { id } = useParams()
  const add = useAppSelector((state) => state.adds.adds.find((e) => e.id === id))
  const navigate = useNavigate()

  const updateAddvertise = async (data: AppEvent) => {
    if (!add) return
    const docRef = doc(db, "adds", add.id as string)
    await updateDoc(docRef, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    })
  }
  const createAddvertise = async (data: FieldValues) => {
    const newEventRef = doc(collection(db, "adds"))
    await setDoc(newEventRef, {
      ...data,
      hostedBy: "bob",
      attendees: [],
      hostPhotoURL: "",
      date: Timestamp.fromDate(data.date as unknown as Date),
    })
    return newEventRef
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      if (add) {
        await updateAddvertise({ ...add, ...data })
        navigate(`/adds/${add.id}`)
      } else {
        const ref = await createAddvertise(data)
        navigate(`/adds/${ref.id}`)
      }
    } catch (error) {
      toast.error((error as unknown as Error).message as string)
    }
  }

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
