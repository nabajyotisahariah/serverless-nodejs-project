# # Use AWS Lambda Node.js runtime base image
# FROM public.ecr.aws/lambda/nodejs:18

# # Set working directory
# WORKDIR ${LAMBDA_TASK_ROOT}

# # Copy package files first
# COPY package*.json ./

# # Install production dependencies
# RUN npm install --omit=dev

# # Copy project files
# COPY . .

# # Expose handler.js Lambda entry point
# CMD [ "handler.handler" ]
FROM public.ecr.aws/lambda/nodejs:18

COPY package*.json ${LAMBDA_TASK_ROOT}/
RUN npm install --omit=dev

COPY . ${LAMBDA_TASK_ROOT}

CMD ["handler.handler"]